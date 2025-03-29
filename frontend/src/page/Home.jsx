import React from 'react'
import Card from '../component/Card'

const Home = () => {
  return (
     <div className='flex flex-col justify-center bg-black h-[100vh]'>
         <div className=' flex flex-row justify-center container mx-auto'>
          <Card />
        </div>
    </div>
  )
}

export default Home



// <!-- From Uiverse.io by Praashoo7 --> 
// <div class="load">
//     <div class="progress"></div>
//     <div class="progress"></div>
//     <div class="progress"></div>
// </div>

// /* From Uiverse.io by Praashoo7 */ 
// .load {
//     display: flex;
//     border-radius: 50%;
//     flex-direction: row;
//   }
  
//   .progress {
//     width: 2em;
//     height: 2em;
//     margin: 0.4em;
//     scale: 0;
//     border-radius: 50%;
//     background: rgb(255, 255, 255);
//     animation: loading_492 2s ease infinite;
//     animation-delay: 1s;
//   }
  
//   @keyframes loading_492 {
//     50% {
//       scale: 1;
//     }
//   }
  
//   .progress:nth-child(2) {
//     animation-delay: 1.3s;
//   }
  
//   .progress:nth-child(3) {
//     animation-delay: 1.7s;
//   }