import {create} from "zustand";

interface InsertCountryModal{
    isOpen: boolean;
    onOpen: ()=>void;
    onClose: ()=>void;
}

const useInsertCountryModal = create<InsertCountryModal>((set)=>({
    isOpen: false,
    onOpen: ()=>set({isOpen:true}),
    onClose: ()=>set({isOpen:false})
}))

export default useInsertCountryModal;