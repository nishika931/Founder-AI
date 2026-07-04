from ai.llm import llm


def market_agent(ceo_report):

    prompt = f"""
You are a Market Research Expert.

Using this startup summary:

{ceo_report}

Generate:

1. Target Market
2. Competitors
3. Market Opportunities
4. Risks

Keep the answer simple.
"""

    response = llm.invoke(prompt)

    return response.content