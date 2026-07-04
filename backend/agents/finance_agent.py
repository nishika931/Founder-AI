from ai.llm import llm


def finance_agent(market_report):

    prompt = f"""
You are a Finance Expert.

Using this report:

{market_report}

Generate:

1. Estimated Cost
2. Revenue Model
3. Pricing
4. Profit Idea

Keep it simple.
"""

    response = llm.invoke(prompt)

    return response.content