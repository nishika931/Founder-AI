from ai.llm import llm


def ceo_agent(title, idea, industry):

    prompt = f"""
You are the CEO of a startup.

Startup Name: {title}

Industry: {industry}

Idea: {idea}

Generate:

1. Startup Summary
2. Problem
3. Solution
4. Target Audience
5. Business Goal

Keep the response simple.
"""

    response = llm.invoke(prompt)

    return response.content