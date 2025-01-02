"use client";

import InsertCountryModal from "@/components/insert-country-modal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);
    
    useEffect(()=>{
        setIsMounted(true);
    },[])

    if (!isMounted) {
        return null;
    }

    return ( 
        <>
            <InsertCountryModal/>
        </> 
    );
}
 
export default ModalProvider;