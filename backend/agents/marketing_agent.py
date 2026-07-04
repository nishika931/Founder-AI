from ai.llm import llm


def marketing_agent(finance_report):

    prompt = f"""
You are a Marketing Expert.

Using this report:

{finance_report}

Generate:

1. Marketing Strategy
2. Social Media Plan
3. Branding
4. Promotion Ideas

Simple language only.
"""

    response = llm.invoke(prompt)

    return response.content