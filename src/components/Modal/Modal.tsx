import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import CrossIcon from '../../Assets/icons/CloseIcon';

interface ModalProps {
  heading: string;
  subheading?: string;
  child: JSX.Element | any;
  onClick?: () => void;
  isOpen: boolean;
  setIsOpen: any;
  height?: string;
  size:
    | 'max-w-2xl'
    | 'max-w-3xl'
    | 'max-w-4xl'
    | 'max-w-5xl'
    | 'max-w-6xl'
    | 'max-w-7xl';
}

export default function Modal({
  isOpen,
  setIsOpen,
  heading,
  subheading,
  child,
  size,
  height,
}: ModalProps) {
  function closeModal() {
    setIsOpen(false);
  }

  return isOpen ? (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className={`relative z-10`} onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-opacity-100" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto ">
            <div
              className={`flex min-h-full  items-center justify-center p-4 text-center bg-[rgba(0,0,0,0.5)]`}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`flex flex-col justify-between w-full ${size} transform overflow-hidden rounded-xl bg-white p-0 text-left align-middle shadow-xl h- transition-all`}
                >
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium text-gray-900 pb-2 p-5 !capitalize border-b border-primary-700 bg-secondary-v1"
                  >
                    <div className="flex !capitalize justify-between">
                      <div className="capitalize font-openSans">
                        <h1 className="">{heading}</h1>
                        {!!subheading && (
                          <p className="text-xs font-openSans">
                            <p>{subheading}</p>
                          </p>
                        )}
                      </div>
                      <div
                        onClick={() => {
                          setIsOpen(false);
                        }}
                        className="cursor-pointer"
                      >
                        <CrossIcon />
                      </div>
                    </div>
                  </Dialog.Title>
                  <Dialog.Description className="bg-bgColor-400 border-t border-primary-700">
                    <div className="max-h-[70vh] p-3 overflow-auto">
                      {child}
                    </div>
                  </Dialog.Description>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  ) : (
    <></>
  );
}
