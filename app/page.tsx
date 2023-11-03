'use client'
import React, {  useEffect, useRef, useState } from "react"
import { CiEdit } from "react-icons/ci"

import { IFormDataAddProduct } from "@/app/interfaces/IFormDataAddProduct"
import {  useForm } from "react-hook-form"
import { ProductInput } from "@/app/components/ProductInput"

import { useRouter } from "next/navigation"

export default function Page({ title }: IFormDataAddProduct ) {

  // It should work like so:
  // On esc - cancel changes 
  // On enter - apply title changes I made
  
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  async function updateTitle(title: string) {
    console.log(title)
   //DB actions
  }

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<IFormDataAddProduct>()

  const { ref, ...rest } = register("title")

  const onSubmit = (data: IFormDataAddProduct) => {
    console.log(26, "data.title - ", data.title)
    setIsEditing(false)
    updateTitle(data.title)
  }

  const enableInput = () => {
    // setValue("title", title)
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
    }, 0)
  }

  const disableInput = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      event.stopPropagation()
      console.log("esc value - ", title)
      // setValue("title", title)
      setIsEditing(false)
    }
    if (event.key === "Enter") {
      console.log("handleSubmit")
      const onSubmitForm = handleSubmit(onSubmit)
      onSubmitForm() // Call the onSubmit function directly
      // console.log("enter value - ", getValues("title"))
      setIsEditing(false)
    }
  }

  const onChange = (e: string) => {
    console.log(e)
    setValue("title", e)
  }

  useEffect(() => {
    const ref = inputRef.current
    console.log(62, "inputRef.current - ", inputRef.current)
    if (inputRef.current) {
      inputRef.current.addEventListener("keydown", disableInput)
    }
    return () => ref?.removeEventListener("keydown", disableInput)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing])

  return (
    <section className="flex flex-col">
      <div className="flex flex-row gap-x-2 justify-between">
        <h1 className="flex flex-row items-center">
          Title:&nbsp;
          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ProductInput
                {...rest}
                id="title"
                name="title"
                ref={e => {
                  ref(e)
                  inputRef.current = e
                }}
                onChange={e => onChange(e.target.value)}
                register={register}
                errors={errors}
                placeholder={title}
              />
            </form>
          ) : (
            <div className="flex flex-row gap-x-2 items-center" role="button" onClick={enableInput}>
              {title}
              <CiEdit />
            </div>
          )}
        </h1>
      </div>
    </section>
  )
}
