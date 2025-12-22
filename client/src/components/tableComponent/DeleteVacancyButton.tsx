type DeleteVacancyButtonProps = {
  vacancyId: string;
  onDeleted?: () => void;
};

export default function DeleteVacancyButton({
  vacancyId,
  onDeleted,
}: DeleteVacancyButtonProps) {
  const handleDelete = async () => {
    const confirm = window.confirm(
      "Tens a certeza que queres remover esta candidatura?"
    );

    if (!confirm) return;

    try {
      await fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation {
              deleteVacancy(id: "${vacancyId}")
            }
          `,
        }),
      });

      onDeleted?.();
    } catch (err) {
      console.error("Erro ao remover vacancy:", err);
      alert("Erro ao remover candidatura");
    }
  };

  return (
    <button
      onClick={handleDelete}
      style={{
        background: "#e53935",
        color: "#fff",
        border: "none",
        padding: "6px 10px",
        cursor: "pointer",
        borderRadius: "4px",
      }}
    >
      Remover
    </button>
  );
}
