import React, { useState, useRef, useCallback } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown, MapPin, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useOnClickOutside } from "../hooks/use-on-click-outside";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormLocation, formLocation } from "@/lib/validators/location-schema";
import debounce from "lodash.debounce";
import { AuthType, auth } from "@/auth";
import { useRouter } from "next/navigation";

// API services
const fetchAddress = async (
  searchQuery: string,
  apiKey: string
): Promise<any[]> => {
  if (!searchQuery) return [];
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    searchQuery
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    return response.data.results || [];
  } catch (error) {
    return [];
  }
};

const submitLocation = async (location: string) => {
  return await axios.post("/api/geo", { location });
};

const dbLocation = async () => {
  const { data } = await axios.get("/api/geo");
  return data || [];
};

const GeoSearch = ({ session }: { session: AuthType | null }) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const placeRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const API_KEY = process.env.NEXT_PUBLIC_GEO_API_KEY!;
  const router = useRouter();

  // Debounced search input
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setSearchQuery(query);
    }, 500),
    []
  );

  // Handle input change with debounce
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  // Fetching geocoding results
  const { data: results = [], isLoading } = useQuery({
    queryKey: ["geocode", searchQuery],
    queryFn: () => fetchAddress(searchQuery, API_KEY),
    enabled: !!searchQuery,
    staleTime: 300000,
    retry: false,
  });

  // Fetch existing locations from DB
  const { data: db = [], refetch } = useQuery({
    queryKey: ["geocode-db"],
    queryFn: () => dbLocation(),
    staleTime: 300000, // 5 minutes
    refetchInterval: 5000, // Refetch every 5 seconds
    refetchOnWindowFocus: true, // Refetch when the window regains focus
    refetchOnReconnect: true, // Refetch when the app reconnects to the internet
    retry: false,
  });

  // Close dropdown when clicking outside
  useOnClickOutside(placeRef, () => setIsShow(false));

  // Form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLocation>({
    resolver: zodResolver(formLocation),
    defaultValues: {
      location: "",
    },
  });

  // Mutation setup and form submit handler combined
  const handleSubmitLocation = useMutation({
    mutationFn: submitLocation,
    onSuccess: () => {
      setSearchQuery("");
    },
    onError: (error) => {},
  });

  // Form submit handler
  const onSubmit = () => {
    if (!session?.user) return router.push("/register");

    handleSubmitLocation.mutate(searchQuery);
  };

  // Handle result click from the search dropdown
  const handleResultClick = (formatted: string) => {
    setSearchQuery(formatted);
    setIsShow(false); // Close dropdown on selection
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <span className="flex text-xs gap-x-1.5 justify-center items-center">
          <MapPin className="w-4" />
          {db?.data?.length > 0 && db.data[0]?.location ? (
            <>
              <p className="font-semibold">Di Kirim ke</p>
              <strong>{db.data[0].location}</strong>
            </>
          ) : (
            <p className="font-semibold">Pilih Alamat</p>
          )}

          <ChevronDown className="w-4" />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2">
        <DropdownMenuLabel className="leading-none p-4">
          <strong className="text-lg font-semibold">
            Mau kirim belanjaan kemana?
          </strong>
          <p className="text-sm font-normal">
            Biar pengalaman belanjamu lebih baik, pilih alamat dulu.
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="p-4">
          <p className="text-lg font-semibold mb-4">Mau pakai cara lain?</p>
          <div className="relative z-10" ref={modalRef}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Search className="absolute top-2 left-2 text-gray-500 w-5" />
                      <Input
                        type="text"
                        placeholder="Pilih kota atau kecamatan"
                        className="min-w-min px-8 py-5"
                        {...field}
                        value={searchQuery}
                        onFocus={() => setIsShow(true)}
                        onChange={(e) => {
                          handleInputChange(e);
                          field.onChange(e.target.value);
                        }}
                        onClick={() => setIsShow(true)}
                      />
                    </>
                  )}
                />
                {errors.location && (
                  <p className="error text-red-500">
                    {errors.location.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full mt-4">
                Gunakan
              </Button>
            </form>
          </div>

          {/* Loading state */}
          {isShow && isLoading && (
            <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
              <p className="p-2">Loading...</p>
            </div>
          )}

          {/* Results dropdown */}
          {isShow && results.length > 0 && (
            <div
              ref={placeRef}
              className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg"
            >
              {results.map((result: any) => (
                <button
                  key={result.annotations.MGRS}
                  className="w-full z-[99] py-3 px-2 text-left"
                  onClick={() => handleResultClick(result.formatted)}
                >
                  {result.formatted}
                </button>
              ))}
            </div>
          )}

          {/* No results found */}
          {isShow && !isLoading && results.length === 0 && searchQuery && (
            <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
              <p className="p-2">Tidak ada hasil ditemukan.</p>
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GeoSearch;
