"use client"
import Navbar from "@/components/global/Navbar"
import { Post, PostCategory } from "@/lib/fragment"
import React, { Suspense } from "react"
import EsgHeader from "./EsgHeader"
import EsgContent from "./EsgContent"
import { PaginationHandlerResponse } from "@/lib/types"

type Prop = {
  categories: PostCategory[]
  posts: PaginationHandlerResponse<Post[]>
}

export default function EsgInAction({ categories, posts }: Prop) {
  const featuredPost = posts?.data?.[0]

  return (
    <>
      <div className="mt-16">
        <Navbar isBackgroundWhite />
        {featuredPost && <EsgHeader post={featuredPost} />}

        <Suspense>
          <EsgContent data={posts} categories={categories} />
        </Suspense>
      </div>
    </>
  )
}
