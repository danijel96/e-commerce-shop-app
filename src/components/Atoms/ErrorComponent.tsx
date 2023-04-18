import { useRouter } from 'next/router';

export const ErrorComponent = () => {
	const router = useRouter();

	//const backToHome = () => {
	//    router.push(ROUTES.HOME)
	//}
	return (
		<div className="h-screen grow-[2] flex flex-col items-center justify-center">
			<p className="text-info-lighter text-[18px]">
				Ooops. Something went wrong! Try again later.
			</p>
			{/*<button
                className="btn-primary mt-8"
                onClick={backToHome}>
                Back to Home
            </button>*/}
		</div>
	);
};
