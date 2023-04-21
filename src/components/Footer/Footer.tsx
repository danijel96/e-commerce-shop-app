import Link from 'next/link';
import { useRouter } from 'next/router';

// internal imports
import { currentYear } from 'common/utils/date.utils';
import { GithubLogo, LinkedinLogo } from 'components/Icons/Icons';
import { useMedia } from 'react-use';
import { BREAKPOINTS } from 'common/constants/global.contants';

const Footer = () => {
	const router = useRouter();
	const isMobile = useMedia(`(max-width: ${BREAKPOINTS.SM})`, true);

	return (
		<footer className="flex flex-col sm:flex-row gap-y-2 justify-between items-center px-7 py-5 border-t-2 mt-10">
			<p className="text-center">
				Powered by&nbsp;
				<Link
					href="https://nextjs.org/"
					target="_blank"
					className="text-primary-main text-sm"
				>
					Next.js {currentYear()}
				</Link>
			</p>
			<p className="text-sm">© Danijel Jovanovic</p>
			<div className="flex items-center">
				<div className="social-icons flex items-center gap-4 ml-4">
					<Link
						href="https://www.linkedin.com/in/jovanovic-danijel/"
						className="flex items-center hover:underline"
					>
						{isMobile && <span>LinkedIn profile: &nbsp;</span>}
						<LinkedinLogo
							width={25}
							className="cursor-pointer"
						/>
					</Link>
					<Link
						href="https://github.com/danijel96/e-commerce-shop-app"
						className="flex items-center hover:underline"
					>
						{isMobile && <p>GitHub repo: &nbsp;</p>}
						<GithubLogo
							width={25}
							className="cursor-pointer"
						/>
					</Link>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
