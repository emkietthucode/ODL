import * as Dialog from '@radix-ui/react-dialog'
import { IoMdClose } from 'react-icons/io'

interface ModalProps {
  isOpen: boolean
  onChange: (open: boolean) => void
  title: string
  description: string
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onChange,
  title,
  description,
  children,
}) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="backdrop-blur-sm fixed inset-0 flex items-center justify-center bg-opacity-30 z-50">
          <Dialog.Content
            className="
              shadow-md
              drop-shadow-md
              border
              border-neutral-400
              max-h-full
              h-full
              md:h-auto
              md:max-h-[85vh]
              w-full
              md:w-[90vw]
              md:max-w-[550px]
              rounded-md
              bg-white
              p-[50px]
              focus:outline-none
            "
          >
            <Dialog.Title
              className="
                text-lg
                text-center
                font-bold
                mb-3
                text-purple
              "
            >
              {title}
            </Dialog.Title>
            <Dialog.Description
              className="
              text-neutral-500
                mb-3
                text-xs
                leading-normal
                text-center
                tracking-wider
              "
            >
              {description}
            </Dialog.Description>
            <hr className="h-[2px] mt-5 mb-8 bg-light-purple border-0 dark:bg-purple"></hr>
            <div>{children}</div>
            <Dialog.Close asChild>
              <button
                className="
                  text-neutral-400
                  hover:text-black
                  absolute
                  top-[10px]
                  right-[10px]
                  inline-flex
                  h-[25px]
                  w-[25px]
                  appearance-none
                  items-center
                  justify-center
                  rounded-full
                  focus:outline-none
                "
              >
                <IoMdClose />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal
