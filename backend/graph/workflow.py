from typing import TypedDict

from langgraph.graph import StateGraph, END

from agents.ceo_agent import ceo_agent
from agents.market_agent import market_agent
from agents.finance_agent import finance_agent
from agents.marketing_agent import marketing_agent
from agents.tech_agent import tech_agent

class StartupState(TypedDict):
    title: str
    idea: str
    industry: str

    ceo_report: str
    market_report: str
    finance_report: str
    marketing_report: str
    tech_report: str

def ceo_node(state):

    report = ceo_agent(
        state["title"],
        state["idea"],
        state["industry"]
    )

    return {
        "ceo_report": report
    }

def market_node(state):

    report = market_agent(
        state["ceo_report"]
    )

    return {
        "market_report": report
    }

def finance_node(state):

    report = finance_agent(
        state["market_report"]
    )

    return {
        "finance_report": report
    }

def marketing_node(state):

    report = marketing_agent(
        state["finance_report"]
    )

    return {
        "marketing_report": report
    }

def tech_node(state):

    report = tech_agent(
        state["marketing_report"]
    )

    return {
        "tech_report": report
    }

graph = StateGraph(StartupState)

graph.add_node("CEO", ceo_node)
graph.add_node("Market", market_node)
graph.add_node("Finance", finance_node)
graph.add_node("Marketing", marketing_node)
graph.add_node("Tech", tech_node)

graph.set_entry_point("CEO")

graph.add_edge("CEO", "Market")
graph.add_edge("Market", "Finance")
graph.add_edge("Finance", "Marketing")
graph.add_edge("Marketing", "Tech")
graph.add_edge("Tech", END)

startup_graph = graph.compile()