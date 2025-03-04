import React from 'react';
import { useForm } from 'react-hook-form';

export default function SearchForm({onSubmit}) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      distance: 10000,
    }
  });
  console.log(errors);

  const classes = "bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 gap-4 margin-4 pb-4'>
      <input type="text" placeholder="Long" className={classes} {...register("long", {required: true, valueAsNumber: true, })} />
      <input type="text" placeholder="Lat" className={classes} {...register("lat", {required: true, valueAsNumber: true, })} />
      <label>Distance (radius meters)</label>
      <input
        className={classes}
        type="text" placeholder="Distance (radius meters)" {...register("distance", {valueAsNumber: true, })} />
      <button className={classes} type="submit" value="Search">Search</button>
    </form>
  );
}