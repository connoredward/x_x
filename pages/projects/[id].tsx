import { GetStaticProps, GetStaticPaths } from 'next';
import fetch from 'isomorphic-unfetch';

import Navigation from '@components/Navigation';

import { Project } from '../../interfaces';

import config from '../../config/var';

const api = config.api.uri;

type Props = {
  post?: Project;
};

const SubProjectPage = ({ post }: Props) => {
  console.log(post);
  return (
    <Navigation>
      <a href="/projects">Return</a>
    </Navigation>
  );
};

export default SubProjectPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${api}getProject`);
  const posts = await res.json();
  const paths = posts.map((post) => ({ params: { id: post._id } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`${api}getProject/${params.id}`);
  const post = await res.json();
  return { props: { post } };
};
