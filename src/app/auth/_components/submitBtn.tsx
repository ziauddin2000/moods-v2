type SubmitBtnProps = {
  btnText: string;
};

export default function SubmitBtn({ btnText }: SubmitBtnProps) {
  return (
    <button type="submit" className="block w-full h-[50px] px-2 py-1 rounded-full text-primary-beige text-lg font-medium cursor-pointer mb-4 bg-gradient-to-l from-green3 to-green4">
      {btnText}
    </button>
  );
}
  