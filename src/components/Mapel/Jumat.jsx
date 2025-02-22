const Jumat = () => {
	return (
		<>
			<div
				className="border-t-2 border-b-2 border-white flex justify-between py-[0.50rem] w-72 px-3"
				data-aos="fade-up"
				data-aos-duration="600">
				<div className="w-[50%] text-base  font-medium">Informatika</div>
				<div className="flex justify-center items-center text-sm">07.25-08.45</div>
			</div>
			<div
				className=" flex justify-between py-[0.50rem] w-72 px-3 opacity-60"
				data-aos="fade-up"
				data-aos-duration="600">
				<div className="w-[50%] text-base  font-medium">Istirahat</div>
				<div className="flex justify-center items-center text-sm">08.45-09.15</div>
			</div>
			<div
				className="border-t-2 border-b-2 border-white flex justify-between py-[0.50rem] w-72 px-3"
				data-aos="fade-up"
				data-aos-duration="700">
				<div className="w-[50%] text-base  font-medium">Informatika</div>
				<div className="flex justify-center items-center text-sm">09.15-09.50</div>
			</div>
			<div
				className="border-b-2 flex justify-between py-[0.50rem] w-72 px-3 opacity-60"
				data-aos="fade-up"
				data-aos-duration="600">
				<div className="w-[50%] text-base  font-medium">Bahasa Indonesia</div>
				<div className="flex justify-center items-center text-sm">09.50-11.00</div>
			</div>
		</>
	)
}

export default Jumat
