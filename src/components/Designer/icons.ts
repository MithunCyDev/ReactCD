import { 
  LayoutGrid, 
  Type, 
  Image, 
  CircleUserRound, 
  Box, 
  Video, 
  Link2, 
  ListOrdered,
  Table2, 
  FormInput,
  AlignJustify,
  LayoutTemplate,
  Heading1
} from 'lucide-react';

// Group icons by category
export const layoutIcons = {
  container: Box,
  grid: LayoutGrid,
  flex: LayoutTemplate,
  navbar: AlignJustify,
};

export const contentIcons = {
  heading: Heading1,
  text: Type,
  list: ListOrdered,
  table: Table2,
};

export const mediaIcons = {
  image: Image,
  video: Video,
};

export const interactiveIcons = {
  button: CircleUserRound,
  link: Link2,
  form: FormInput,
  input: FormInput,
};