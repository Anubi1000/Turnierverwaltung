export default function Page({ params }: { params: { tournamentId: string } }) {
  return <div>{params.tournamentId}</div>;
}
