import React from 'react'

interface PageProps {
    title: string;
    content: JSX.Element
}
const Page = ({ title, content }: PageProps) => {
    return (
        <>
            <div className="bg-white">
                <div>

                    <main className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="flex items-baseline justify-center border-b border-gray-200 pt-14 pb-6">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 text-center">{title}</h1>
                        </div>

                        <section aria-labelledby="products-heading" className="pt-6 pb-24">
                            <div className="grid grid-cols-1 gap-x-8 gap-y-10 h-[700px]">
                                {content}
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </>
    )
}

export default Page