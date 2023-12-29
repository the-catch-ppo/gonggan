import ContactDetail from "@/app/components/Admin/ContactDetail";
import Title from "@/app/components/Admin/Title";

export default function Detail ({ params }: { params: { id: string } }) {
  const id = params?.id;

  return (
    <>
      <Title type="문의 내용" />
      <ContactDetail id={id} />
    </>
  )
}