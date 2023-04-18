 interface CheckboxProps {
	id: string;
	label: string;
	checked: boolean;
	value: string | number;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomCheckbox = ({
	id,
	label,
	checked,
	value,
	onChange,
}: CheckboxProps) => {
	return (
		<label className="ml-2">
			<input
				className="form-checkbox h-3 w-3 text-primary rounded-none transition duration-150 ease-in-out checked:bg-primary-checked checked:border-transparent focus:ring-primary"
				type="checkbox"
				id={id}
				value={value}
				checked={checked}
				onChange={onChange}
			/>
			<span className="ml-2">{label}</span>
		</label>
	);
};

export default CustomCheckbox;