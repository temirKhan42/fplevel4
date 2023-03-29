import { NextPage } from 'next';
import { connect, query } from '../../lib/db';

interface ExampleProps {
  data: any[];
}

const Example: NextPage<ExampleProps> = ({ data }) => {

  return (
    <div>
      <h1>Example Data:</h1>
    </div>
  );
};

export async function getStaticProps() {
  // Connect to the database
  connect();

  const { rows } = await query('SELECT * FROM users', []);
  return {
    props: {
      data: rows
    }
  };
}

export default Example;