from ai.llm import llm


def tech_agent(marketing_report):

    prompt = f"""
You are a Software Architect.

Using this report:

{marketing_report}

Generate:

1. Tech Stack
2. Database
3. Backend
4. Frontend
5. AI Tools

Simple explanation.
"""

    response = llm.invoke(prompt)

    return response.content