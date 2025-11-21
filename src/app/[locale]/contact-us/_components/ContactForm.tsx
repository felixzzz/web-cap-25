"use client"

import { iconPhone, iconPrint } from "@/data/images"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import Anim from "@/components/global/Anim"
import { countryList } from "@/data/data"
import { MetaContactUsBanner, MetaTopics } from "@/lib/fragment"
import { useLocale, useTranslations } from "next-intl"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { postContactUs } from "@/lib/api"
import { toast } from "@/components/ui/use-toast"

const contactFormSchema = z.object({
  type: z.string(),
  firstname: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email().max(30, {
    message: "Email must not be longer than 30 characters.",
  }),
  country: z.string({
    required_error: "Please select a country.",
  }),
  topic_id: z.string({
    required_error: "Please select a topic.",
  }),
  message: z.string(),
})

type ContactFormValues = z.infer<typeof contactFormSchema>
const defaultValues = {
  type: "ContactUs",
  firstname: "",
  lastname: "",
  email: "",
  country: "",
  topic_id: "",
  message: "",
}

export default function ContactForm({
  fax_en,
  fax_id,
  head_office_address_en,
  head_office_address_id,
  head_office_label_en,
  head_office_label_id,
  head_office_name_en,
  head_office_name_id,
  image_desktop_en,
  image_desktop_id,
  image_mobile_en,
  image_mobile_id,
  phone_en,
  phone_id,
  status_en,
  status_id,
  title_en,
  title_id,
  topics,
}: MetaContactUsBanner & { topics: MetaTopics[] }) {
  const locale = useLocale()
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  })
  const tNavbar = useTranslations("navbar")

  async function onSubmit(data: ContactFormValues) {
    try {
      setIsLoading(true)
      await postContactUs(data)
      toast({
        title: "Your message has been sent.",
        duration: 2000,
      })
      form.reset(defaultValues)
    } catch (error) {
      toast({
        title: "Your message failed to sent.",
        duration: 2000,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!isContentActive(locale, status_en, status_id)) return <></>

  return (
    <section className="relative flex min-h-[750px] flex-col lg:flex-row">
      <div className="relative w-full content-end p-8 lg:w-4/12">
        <Image
          src={
            assetUrl(
              getLocalizedContent(locale, image_desktop_id, image_desktop_id)
            ) || ""
          }
          className="-z-10 h-full object-cover"
          fill
          alt={getLocalizedContent(
            locale,
            head_office_name_en,
            head_office_name_id
          )}
        />
        <Anim>
          <div className="rounded-3xl bg-white p-6">
            <div className="text-lg font-bold">
              {getLocalizedContent(
                locale,
                head_office_name_en,
                head_office_name_id
              )}
            </div>
            <div className="mt-4 text-md font-bold">
              {getLocalizedContent(
                locale,
                head_office_label_en,
                head_office_label_id
              )}
            </div>
            <div
              className="mt-2 text-sm tracking-[0.14px]"
              dangerouslySetInnerHTML={{
                __html: getLocalizedContent(
                  locale,
                  head_office_address_en,
                  head_office_address_id
                ),
              }}
            />
            <div className="mt-4 flex flex-col gap-2 text-sm tracking-[0.14px] lg:mt-2 lg:flex-row lg:gap-4">
              <div className="flex flex-row gap-2">
                <Image src={iconPhone} alt="" />
                <div className="my-auto">
                  {getLocalizedContent(locale, phone_en, phone_id)}
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <Image src={iconPrint} alt="" />
                <div className="my-auto">
                  {getLocalizedContent(locale, fax_en, fax_id)}
                </div>
              </div>
            </div>
          </div>
        </Anim>
      </div>
      <div className="relative w-full content-center px-5 py-6 lg:w-8/12 lg:px-20">
        <Anim delay={300}>
          <div className="text-3xl font-bold">{tNavbar("contact_us")}</div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-8 space-y-6"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        First Name
                        <span className="text-sm text-red-700">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Input your First Name"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Last Name<span className="text-sm text-red-700">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Input your Last Name"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Email
                        <span className="text-sm text-red-700">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          required
                          placeholder="Input your Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>
                        Country
                        <span className="text-sm text-red-700">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value || ""}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select your Country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countryList?.map((country: string) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="topic_id"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      Topic
                      <span className="text-sm text-red-700">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value || ""}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Topic" />
                      </SelectTrigger>
                      <SelectContent>
                        {topics?.map((item) => (
                          <SelectItem key={item.id} value={item.id.toString()}>
                            {getLocalizedContent(
                              locale,
                              item.name_en,
                              item.name
                            )}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Add your questions
                      <span className="text-sm text-red-700">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your comment or additional question here"
                        className="resize-none"
                        rows={8}
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isLoading}
                  className="w-full max-w-[148px] text-white"
                >
                  {isLoading && (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  )}
                  {!isLoading && "Submit"}
                </Button>
              </div>
            </form>
          </Form>
        </Anim>
      </div>
    </section>
  )
}
