'use client'

import React, { useRef } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  firstName: string,
  lastName: string,
};

export default function App() {
  const { register, handleSubmit } = useForm<Inputs>();
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const onSubmit = (data:Inputs) => console.log(data);
  const { ref, ...rest } = register('firstName');

  //Here is the issue
  console.log(16,"firstNameRef.current - ",firstNameRef.current)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...rest} name="firstName" ref={(e) => {
        ref(e)
        firstNameRef.current = e // you can still assign to ref
      }} />

      <button>Submit</button>
    </form>
  );
}