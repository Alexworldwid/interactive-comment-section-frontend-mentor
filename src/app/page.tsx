import Image from "next/image";
import CommentSection from "./components/commentSection";
import AddCommentForm from "./components/forms/comment/addCommentForm";

export default function Home() {
  return (
    <main className=" bg-[#EAECF1] min-h-screen px-6 py-10 flex justify-center">
      <section className="w-full max-w-[1440px] flex flex-col justify-center items-center">
        <CommentSection />
        <AddCommentForm />
      </section>
    </main>
  );
}
