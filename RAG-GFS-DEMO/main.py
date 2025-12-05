from google import genai
from google.genai import types
import time
from dotenv import load_dotenv

load_dotenv()
client = genai.Client()

file_search_store = client.file_search_stores.create(
    config={"display_name": "fda-drug-labels"}
)
print(f"Created store: {file_search_store.name}")

pdf_files = ["metformin.pdf", "atorvastatin.pdf", "lisinopril.pdf"]

for pdf_file in pdf_files:
    operation = client.file_search_stores.upload_to_file_search_store(
        file=pdf_file,
        file_search_store_name=file_search_store.name,
        config={"display_name": pdf_file.replace(".pdf", "")},
    )

    # Wait for indexing to complete
    while not operation.done:
        time.sleep(3)
        operation = client.operations.get(operation)

    print(f"{pdf_file} indexed")


query1 = "What are the contraindications for metformin?"

response1 = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=query1,
    config=types.GenerateContentConfig(
        tools=[
            types.Tool(
                file_search=types.FileSearch(
                    file_search_store_names=[file_search_store.name]
                )
            )
        ]
    ),
)

print(response1.text)

query2 = "Can a patient take both atorvastatin and metformin together? Are there any drug interactions?"

response2 = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=query2,
    config=types.GenerateContentConfig(
        tools=[
            types.Tool(
                file_search=types.FileSearch(
                    file_search_store_names=[file_search_store.name]
                )
            )
        ]
    ),
)

print(response2.text)

print("Sources used:")

for i, chunk in enumerate(response2.candidates[0].grounding_metadata.grounding_chunks, 1):
    source_name = chunk.retrieved_context.title
    source_text = chunk.retrieved_context.text[:100] + "..."
    print(f"  [{i}] {source_name}")
    print(f"      {source_text}")


query3 = "Which medications have muscle-related side effects?"

response3 = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=query3,
    config=types.GenerateContentConfig(
        tools=[
            types.Tool(
                file_search=types.FileSearch(
                    file_search_store_names=[file_search_store.name]
                )
            )
        ]
    ),
)

print(response3.text)

# Check which documents were consulted
metadata = response3.candidates[0].grounding_metadata
for i, chunk in enumerate(metadata.grounding_chunks, 1):
    print(f"  [{i}] {chunk.retrieved_context.title}")