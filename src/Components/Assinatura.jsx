export function Assinatura(){


    return(
        <>
        <section className="bg-[#898989] h-[14rem] text-center font-semibold">
            <div className="pt-6 text-white">
                <h2 className="text-[1.5rem]" >OFERTAS & NOVIDADES</h2>
                <p className="text-[0.75rem]">Assine nossa news e receba nossas novidades e lançamentos com exclusividade.</p>
            </div>

            <div className="flex flex-col gap-7 pt-5 sm:flex-row sm:justify-center  ">
                <div className="flex justify-center text-[0.5rem] sm:text-[1rem] items-center">
                    <form action="" className="">

                        <input type="text" name="" id="" placeholder="Digite seu nome completo" className="h-[1rem] w-[8rem]  mr-[1rem] p-2.5 rounded-[3px] sm:p-5 sm:w-[16rem] shadow-md "/>

                        <input type="text" name="" id="" placeholder="Digite seu email" className="h-[1rem] w-[5rem]  mr-[1rem] p-2.5  rounded-[3px]  sm:p-5 sm:w-[10rem] shadow-md " />

                        <input type="text" name="" id="" placeholder="Digite seu numero de whatsapp" className="h-[1rem] w-[9rem]  p-2.5  rounded-[3px]  sm:p-5 sm:w-[17rem] shadow-md " />
                    </form>
                </div>
                <div>
                <button type="submit" className="bg-black text-white w-[12rem] h-[2rem] text-[0.8 rem]  rounded-[3px] sm:h-[3rem] shadow-md " >ASSINE AQUI</button>
                </div>
            </div>
        </section>

        </>
    )
}