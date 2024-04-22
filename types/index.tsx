export type Content = {
  _id?: string;
  type: string;
  displayImg: string;
  subject: string;
  title: string;
  createdAt?: string;
  author: string;
  img: string;
  videoUrl: string;
  text: string;
};

export type ContentItem = Omit<Content, "author img videoUrl text">;

export interface UserType {
  id?: string;
  username: string;
  password: string;
  email: string;
  type: string;
  active: boolean;
}

export type CreateUserType = Omit<UserType, "active">;
export type StoreUserType = Omit<UserType, "password">;
