import ToggleOption from "./ToggleOptionProp.Interface";

export default interface ToggleOptionsProps<T> {
    options: ToggleOption<T>[];
    activeValue: T;
    onChange: (value: T) => void;
}