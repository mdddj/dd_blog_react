export interface Blog {
  id:          number;
  title:       string;
  content:     string;
  createTime:  number;
  category:    Category;
  author:      string;
  thumbnail:   null;
  dateString:  Date;
  tags:        Tag[];
  aliasString: string;
}

export interface Category {
  id:         number;
  name:       string;
  logo:       string;
  intro:      string;
  createTime: number;
}

export interface Tag {
  id:   number;
  name: string;
}
