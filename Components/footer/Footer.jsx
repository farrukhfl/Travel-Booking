import React from 'react'

const Footer = () => {
  return (
    <div className='border h-[400px] w-full mt-32'>

      <div className='py-12 h-full w-5/6 mx-auto flex items-center justify-between'>
    <div className='flex gap-4 flex-col flex-1'>
      <h2>
    About the app
      </h2>
      <p className='max-w-[375px]'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam quibusdam inventore unde
         qui illum at magnam delectus quod hic natus voluptatem asperiores eaque odio laboriosam, 
        debitis distinctio voluptate rerum, quasi quibusdam laudantium, deleniti est, dolor rem!
      </p>
    </div>

    <div className='flex flex-1 flex-col gap-4 items-center'>
        <h2>Contacts</h2>
        <span>Phone: +123 456 789</span>
        <span>Facebook: farrukhfl</span>
        <span>Github: Farrukhfl</span>

    </div>

    <div className='flex flex-1 flex-col gap-4 items-end'>
    <h2>Location</h2>
    <span>Continent: Asia</span>
    <span>Country: Pakistan</span>
    <span>Current Location: Karachi</span>

    </div>

      </div>
      
    </div>
  )
}

export default Footer
