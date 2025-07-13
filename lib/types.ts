export type ErrorType = {
  message: string;
};
export interface UserInterface {
  _id?: string;
  username: string;
}
export type Post = {
  _id: string;
  text: string;
  createdAt: string;
  author: {
    _id: string;
    username: string;
  };
  likes: [
    {
      _id: string;
      username: string;
    }
  ];
  comments?: {
    _id: string;
    text: string;
    author: { username: string };
  }[];
};
export interface CommentProp {
  text: string;
  author: {
    _id: string;
    username: string;
  };
  _id: string;

  createdAt: string;
}
export interface PostCardProps {
  post: Post;
  fetchPosts: () => Promise<void>;
  setOpenModal: (val: boolean) => void;
  currentUser: {
    _id: string;
    username: string;
  };
  token: string;
}
