import React from 'react';
import { List, ListItem, StatusIndicator } from './SetupOrgStyles';

const dummyPages = [
  { url: 'https://example.com', status: 'scraped', chunks: ['Header content', 'Main section text'] },
  { url: 'https://example.com/about', status: 'pending', chunks: [] },
];

const ScrapedPagesList = ({ onPageClick }) => {
  return (
    <List>
      {dummyPages.map((page, index) => (
        <ListItem key={index} onClick={() => onPageClick(page)}>
          <span>{page.url}</span>
          <StatusIndicator status={page.status}>
            {page.status.toUpperCase()}
          </StatusIndicator>
        </ListItem>
      ))}
    </List>
  );
};

export default ScrapedPagesList;