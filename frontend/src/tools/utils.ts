export const normalizedMessages = (messages: any) => {
  return messages?.map((messageDetails: any) => messageDetails._source);
};
