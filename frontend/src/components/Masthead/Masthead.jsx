import Lottie from 'react-lottie';
import sleepingAnimation from '../../lotties/dream animation.json';

const Masthead = () => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: sleepingAnimation,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};
	return (
		<div>
			<Lottie options={defaultOptions} />
		</div>
	);
};

export default Masthead;
