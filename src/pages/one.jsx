export default function One() {

  return (
    <div>
      <h1>Example Data:</h1>
    </div>
  );
};

export async function getServerSideProps() {
  return { 
    props: {}
  };
}
