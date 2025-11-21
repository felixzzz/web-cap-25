"use client"

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
import { CustomBreadcrumb } from "@/components/global/CustomBreadcrumb"
import { MetaCover, MetaTopics } from "@/lib/fragment"
import { useLocale } from "next-intl"
import { assetUrl, getLocalizedContent, isContentActive } from "@/lib/utils"
import { countryList } from "@/data/data"
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
  type: "Whistleblowing",
  firstname: "",
  lastname: "",
  email: "",
  country: undefined,
  topic_id: undefined,
  message: "",
}

export default function WhistleblowingForm({
  description_en,
  description_id,
  image_desktop_en,
  image_desktop_id,
  image_mobile_en,
  image_mobile_id,
  small_title_en,
  small_title_id,
  status_en,
  status_id,
  title_en,
  title_id,
  topics,
}: MetaCover & { topics: MetaTopics[] }) {
  const locale = useLocale()
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  })

  async function onSubmit(data: ContactFormValues) {
    try {
      setIsLoading(true)
      await postContactUs(data)
      toast({
        title: "Your message has been sent.",
        duration: 2000,
      })
      form.reset()
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
    <>
      <section className="pt-6">
        <div className="container">
          <Anim>
            <CustomBreadcrumb
              data={[
                {
                  url: "/news",
                  label: "News",
                  isPrimary: true,
                },
                {
                  url: "/governance",
                  label: "Governance",
                  isPrimary: true,
                },
                {
                  label: "Whistleblowing",
                  isPrimary: true,
                },
              ]}
              className="mb-8"
            />
          </Anim>
        </div>
        <div className="relative flex min-h-[750px] flex-col lg:flex-row">
          <div className="relative hidden w-full content-end p-8 lg:block lg:w-4/12">
            <Image
              src={
                assetUrl(
                  getLocalizedContent(
                    locale,
                    image_desktop_en || image_desktop_id,
                    image_desktop_id
                  )
                ) || ""
              }
              className="-z-10 h-full rounded-tr-3xl object-cover"
              fill
              alt={getLocalizedContent(locale, title_en, title_id) || ""}
            />
          </div>
          <div className="relative w-full content-center px-5 py-6 lg:w-8/12 lg:px-20">
            <Anim delay={300}>
              <div className="text-3xl font-bold">
                {getLocalizedContent(locale, title_en, title_id)}
              </div>
              <div
                className="prose mt-4 text-xs"
                dangerouslySetInnerHTML={{
                  __html:
                    getLocalizedContent(
                      locale,
                      description_en,
                      description_id
                    ) || "",
                }}
              />
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
                            Last Name
                            <span className="text-sm text-red-700">*</span>
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
                              {countryList?.map((country) => (
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
                              <SelectItem
                                key={item.id}
                                value={item.id.toString()}
                              >
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
                          Add Comment or additional questions
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
        </div>
      </section>
    </>
  )
}
