export async function combineDocumentsToString(documents: Document[]): Promise<string> {
      return documents.map((doc: any) => doc.pageContent).join(" ");
    }