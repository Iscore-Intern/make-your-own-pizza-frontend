export default function SpecialRequest() {
  return (
    <div className="w-full mt-4">
      <label className="text-sm font-bold text-black-font mb-2 block">
        Special Request
      </label>
      <textarea 
        className="w-full px-4 py-3 rounded-xl border border-beige-dark bg-beige-color text-black-font placeholder-sub-color focus:outline-none focus:border-black-font border-r-4 border-b-4 border-l-1 border-t-1 transition-all duration-200 resize-y"
        placeholder="Have any allergies or special instructions?" 
        rows={3}
      ></textarea>
    </div>
  );
}