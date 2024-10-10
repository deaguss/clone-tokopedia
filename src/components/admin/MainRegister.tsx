"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, X } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  ACCEPTED_FILE_MIME_TYPES,
  ACCEPTED_IMAGE_MIME_TYPES,
  FormStore,
  formStore,
} from "@/lib/validators/store-schema";
import { Textarea } from "../ui/textarea";

const MainRegister = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedOption, setSelectedOption] = useState<
    FormStore["typeStore"] | null
  >();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [docsFile, setDocsFile] = useState<File | null>(null);

  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<FormStore>({
    resolver: zodResolver(formStore),
    defaultValues: {
      name: "",
      location: "",
      description: "",
      image: "",
      docs: "",
      email: "",
      typeStore: undefined,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleDocsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocsFile(file);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
  };

  const onSubmit = (data: FormStore) => {
    console.log("Form Data:", data);
  };

  const handleOptionSelect = (option: FormStore["typeStore"]) => {
    setSelectedOption(option);
    setStep(2);
  };

  const handleBackToStep2 = () => {
    resetField("docs"); // Reset file input when going back to step 2
    setDocsFile(null); // Clear the file from state
    setStep(2);
  };

  return (
    <>
      {/* Step 1: Option selection */}
      {step === 1 && (
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          {/* First Option */}
          <div
            className={`flex items-center border ${
              selectedOption === ("perorangan" as FormStore["typeStore"])
                ? "border-green-500 bg-green-100/70"
                : "border-gray-200"
            } rounded-lg p-4 w-full lg:w-[280px] cursor-pointer group hover:border-green-400 hover:bg-green-100/50`}
            tabIndex={0}
            onClick={() =>
              handleOptionSelect("perorangan" as FormStore["typeStore"])
            }
          >
            <div className="mr-4">
              <i className="fas fa-store text-3xl text-green-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Toko perorangan</h3>
              <p className="text-gray-500 text-sm">
                Buka toko, prosesnya mudah dan cepat, hanya dengan verifikasi
                e-KTP.
              </p>
            </div>
          </div>

          {/* Second Option */}
          <div
            className={`flex items-center border ${
              selectedOption === ("official" as FormStore["typeStore"])
                ? "border-green-500 bg-green-100/70"
                : "border-gray-200"
            } rounded-lg p-4 w-full lg:w-[280px] cursor-pointer group hover:border-green-400 hover:bg-green-100/50`}
            tabIndex={0}
            onClick={() =>
              handleOptionSelect("official" as FormStore["typeStore"])
            }
          >
            <div className="mr-4">
              <i className="fas fa-check-circle text-3xl text-purple-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Official Store</h3>
              <p className="text-gray-500 text-sm">
                Toko dengan layanan eksklusif yang memiliki dokumen SIUP/NIB,
                KTP & NPWP.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Form Submission */}
      {step === 2 && (
        <div>
          <Button
            variant="outline"
            onClick={() => setStep(1)}
            className="rounded-xl text-gray-800 flex items-center gap-x-1 mb-10"
          >
            <ChevronLeft className="w-4 h-4" />
            Kembali
          </Button>
          <h2 className="text-lg font-semibold mb-4">
            Step 2: Verifikasi Data
          </h2>
          <p className="font-semibold text-sm text-gray-700 mt-2">
            Silakan verifikasi data Anda berdasarkan pilihan toko yang dipilih.
          </p>

          <Form {...(control as any)}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Input */}
              <div className="form-group">
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="tokopedia"
                          aria-invalid={!!errors.name}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your public display name for store.
                      </FormDescription>
                      {errors.name && (
                        <FormMessage>{errors.name.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <div className="form-group">
                <Controller
                  control={control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Bali"
                          aria-invalid={!!errors}
                          {...field}
                        />
                      </FormControl>
                      {errors.location && (
                        <FormMessage>{errors.location.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <div className="form-group">
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          maxLength={500}
                          placeholder="Toko buah khas palembang"
                          aria-invalid={!!errors}
                          {...field}
                        />
                      </FormControl>
                      {errors.description && (
                        <FormMessage>{errors.description.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <div className="form-group">
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="tk@gmail.com"
                          aria-invalid={!!errors}
                          {...field}
                        />
                      </FormControl>
                      {errors.email && (
                        <FormMessage>{errors.email.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>

              <div className="form-group">
                <Controller
                  control={control}
                  name="docs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dokumen izin *</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept={ACCEPTED_FILE_MIME_TYPES.join(", ")}
                          onChange={(e) => {
                            const files = e.target.files
                              ? Array.from(e.target.files)
                              : [];
                            field.onChange(files); // Set the value as an array of files
                            handleDocsChange(e); // Update state
                          }}
                          aria-invalid={!!errors.docs}
                        />
                      </FormControl>
                      <FormDescription>
                        Please upload SIUP / NIB, KTP & NPWP documents pdf, docx
                        file
                      </FormDescription>
                      {errors.docs && (
                        <FormMessage>
                          {errors.docs.message?.toString()}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>

              {/* Next Step Button */}
              <div className="mt-8 flex justify-end">
                <Button onClick={() => setStep(3)} variant="outline">
                  Next
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}

      {/* Step 3: Upload Image */}
      {step === 3 && (
        <div>
          <Button
            variant="outline"
            onClick={handleBackToStep2}
            className="rounded-xl text-gray-800 flex items-center gap-x-1 mb-10"
          >
            <ChevronLeft className="w-4 h-4" />
            Kembali
          </Button>
          <h2 className="text-lg font-semibold mb-4">Step 3: Upload Image</h2>
          <Form {...(control as any)}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="form-group">
                <Controller
                  control={control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Image *</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept={ACCEPTED_IMAGE_MIME_TYPES.join(", ")}
                          onChange={(e) => {
                            const files = e.target.files
                              ? Array.from(e.target.files)
                              : [];
                            field.onChange(files); // Sync file with react-hook-form
                            handleImageChange(e); // Handle preview
                          }}
                          aria-invalid={!!errors.image}
                        />
                      </FormControl>
                      {errors.image && (
                        <FormMessage>
                          {errors.image.message?.toString()}
                        </FormMessage>
                      )}
                      {/* Image Preview */}
                      {previewImage && (
                        <div className="mt-4 relative w-[200px] h-[200px]">
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <Button
                            variant="ghost"
                            onClick={removeImage}
                            className="absolute top-2 right-2 p-1 bg-gray-100/70 rounded-full"
                            size="sm"
                          >
                            <X className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      )}
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="mt-8 flex justify-end">
                <Button type="submit" variant="outline">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </>
  );
};

export default MainRegister;
