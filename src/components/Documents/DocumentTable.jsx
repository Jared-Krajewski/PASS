// React Imports
import React, { useContext } from 'react';
// Material UI Imports
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// Context Imports
import { DocumentListContext } from '@contexts';
// Component Imports
import { StyledTableCell } from '../Table/TableStyles';
import DocumentTableRow from './DocumentTableRow';
import { EmptyListNotification, LoadingAnimation } from '../Notification';

/**
 * DocumentTable Component - The Document Table that shows the list of documents
 * stored on Solid
 *
 * @memberof Documents
 * @name DocumentTable
 * @returns {React.JSX.Element} The DocumentTable component
 */
const DocumentTable = () => {
  const { documentListObject, loadingDocuments } = useContext(DocumentListContext);
  const columnTitlesArray = [
    'Name',
    'Type',
    'Description',
    'Upload Date',
    'Expiration Date',
    'Preview File',
    'Delete'
  ];

  const determineDocumentsTable = documentListObject?.docList?.length ? (
    // render if documents
    <Container>
      <TableContainer component={Paper} sx={{ margin: '1rem 0' }}>
        <Table aria-label="Documents Table">
          <TableHead>
            <TableRow>
              {columnTitlesArray.map((columnTitle) => (
                <StyledTableCell key={columnTitle} align="center">
                  {columnTitle}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {documentListObject?.docList.map((document) => (
              <DocumentTableRow key={document.name} document={document} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  ) : (
    // render if no documents
    <EmptyListNotification type="documents" />
  );

  // MAIN RETURN OF COMPONENT
  return loadingDocuments ? <LoadingAnimation loadingItem="documents" /> : determineDocumentsTable;
};

export default DocumentTable;
