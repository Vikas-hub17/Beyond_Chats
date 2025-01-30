// src/components/SetupOrg/SetupOrgStyles.js
import styled from 'styled-components';

export const Container = styled.div`
  /* Container styles */
`;

export const List = styled.ul`
  /* List styles */
  list-style: none;
  padding: 0;
`;

export const ListItem = styled.li`
  /* List item styles */
  padding: 8px 0;
  border-bottom: 1px solid #eee;
`;

export const StatusIndicator = styled.div`
  /* Status indicator styles */
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.status === 'success' ? '#4CAF50' : '#ff0000'};
`;