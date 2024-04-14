from langchain.chains.summarize import load_summarize_chain
from langchain_community.document_loaders import WebBaseLoader
from langchain_openai import ChatOpenAI

path = "https://aiflavoured.s3.ap-south-1.amazonaws.com/d8909f44-a98b-416d-99c0-e3aac1895500/1712406131120ilovepdf_merged_removed.pdf"

loader = WebBaseLoader(path)
docs = loader.load()

llm = ChatOpenAI(api_key="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", temperature=0, model_name="gpt-3.5-turbo-1106")
chain = load_summarize_chain(llm, chain_type="stuff")

chain.invoke(docs)