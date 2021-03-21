type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createAt?: Date;
}

type Tag = {
  id: string;
  name: string;
}

type TagListModel = {
  data: tag[];
  fetch: () => tag[];
  create: (name: string) => 'success' | 'duplicated';
  update: (id: string, name: string) => 'success' | 'not found' | 'duplicated';
  save: () => void;
  remove: (id: string) => boolean;
}

interface Window {
  tagList: Tag[];
  findTag: (id: string) => Tag | undefined;
  createTag: (name: string) => void;
  removeTag: (id: string) => boolean;
  updateTag: (id: string, name: string) => 'success' | 'not found' | 'duplicated';
}