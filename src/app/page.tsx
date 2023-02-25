import {redirect} from "next/navigation";

export default function Page (){
     // redirect('/landing-page')
     return (
         <>
             {process.env.DATABASE_URL}
         </>
     )
}