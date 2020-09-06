import { GetStaticProps, GetStaticPaths } from 'next';
import fetch from 'isomorphic-unfetch';

import { Post } from '../../interfaces';

type Props = {
  post?: Post;
};

const StaticPropsDetail = () => {
  return <div>load</div>;
};

export default StaticPropsDetail;

// export const getStaticPaths: GetStaticPaths = async () => {
//   const res = await fetch('http://localhost:8080/getProject');
//   const posts = await res.json();
//   const paths = posts.map((post) => ({ params: { id: post._id } }));
//   return { paths, fallback: false };
// }

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const res = await fetch(`http://localhost:8080/getProject/${params.id}`);
//   const post = await res.json();
//   return { props: { post } };
// }
