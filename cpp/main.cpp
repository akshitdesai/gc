/**
 * Author : RDP
 * There are no two words in the English language more harmful than "good job".
 * 1729 ;)
 **/
#include <bits/stdc++.h>

using namespace std;
using ll = long long;

/********** Definations, Macros and Debug Stuff  **********/
void debug_out() { cerr << '\n'; }
string to_string(const string &s) { return s; }
template <typename Head, typename... Tail>
void debug_out(Head H, Tail... T)
{
    cerr << " " << to_string(H);
    debug_out(T...);
}

#define endl '\n'
#define debug(...) cerr << "[" << #__VA_ARGS__ << "]: ", debug_out(__VA_ARGS__)
#define GODSPEED                 \
    ios::sync_with_stdio(false); \
    std::cin.tie(NULL);          \
    std::cout.tie(NULL);
#define all(x) (x).begin(), (x).end()
const long double EPS = 5e-8;
#define PI 3.1415926535897932384626433832795
const ll MOD = 1000000007;
/**********************************************************/
class Graph
{
public:
    int num_vertex, num_edge;
    int chromatic_number;
    map<int, vector<int>> adj;
    map<int, int> coloring;

    Graph()
    {
        this->num_vertex = this->num_edge = 0;
        this->chromatic_number = 2;
    };
    Graph(int N, int k, vector<pair<int, int>> edges, map<int, int> colored)
    {
        this->num_vertex = N;
        this->chromatic_number = k;
        this->num_edge = edges.size();
        this->coloring = colored;
        for (auto [u, v] : edges)
        {
            adj[u].push_back(v);
            adj[v].push_back(u);
        }
    }
    void print()
    {
        cout << "============= Graph ==============" << endl;
        for (auto p : this->adj)
        {
            cout << p.first << "( " << this->coloring[p.first] << " ): -> ";
            for (auto v : p.second)
                cout << v << ", ";
            cout << endl;
        }
        cout << "==================================" << endl;
    }
};
class FirstFitSolver
{
private:
    Graph g;

public:
    FirstFitSolver() { ; };
    FirstFitSolver(Graph g)
    {
        this->g = g;
    }
    Graph solve(int vertex, vector<int> neighbours)
    {
        set<int> neighbour_colors;
        this->g.num_vertex++;
        this->g.adj[vertex] = {};
        for (int v : neighbours)
        {
            neighbour_colors.insert(this->g.coloring[v]);
            this->g.adj[v].push_back(vertex);
            this->g.adj[vertex].push_back(v);
            this->g.num_edge++;
        }
        int color = 1;
        while (neighbour_colors.count(color))
            color++;
        this->g.coloring[vertex] = color;
        return this->g;
    }
};
class CBIPSolver
{
private:
    Graph g;

    vector<set<int>> get_partition(int start_bfs)
    {
        assert(this->g.chromatic_number == 2);
        map<int, bool> visited;
        vector<set<int>> partition(2);
        queue<int> q;
        const int i = start_bfs;
        q.push(i);
        visited[i] = true;
        int lvl = 0;
        while (!q.empty())
        {
            int size = q.size();
            for (int j = 0; j < size; j++)
            {
                auto u = q.front();
                q.pop();
                partition[lvl].insert(u);
                for (auto v : this->g.adj[u])
                {
                    if (!visited[v])
                    {
                        visited[v] = true;
                        q.push(v);
                    }
                }
            }
            lvl ^= 1;
        }
        return partition;
    }

public:
    CBIPSolver() { ; };
    CBIPSolver(Graph g)
    {
        this->g = g;
    }
    Graph solve(int vertex, vector<int> neighbours)
    {
        this->g.num_vertex++;
        this->g.adj[vertex] = {};
        for (int v : neighbours)
        {
            this->g.adj[v].push_back(vertex);
            this->g.adj[vertex].push_back(v);
            this->g.num_edge++;
        }
        auto partition = get_partition(vertex);
        int color = 1;
        for (auto p : partition)
        {
            cerr << "Partition ";
            for (auto x : p)
                cerr
                    << x << " ";
            cerr << endl;
            if (p.count(vertex))
                continue;
            set<int> neighbour_colors;
            for (int v : p)
                neighbour_colors.insert(this->g.coloring[v]);
            while (neighbour_colors.count(color))
                color++;
        }
        this->g.coloring[vertex] = color;
        debug(vertex, color);
        return this->g;
    }
};
void test_case()
{
    // FirstFitSolver fs;
    // fs.solve(1, {}).print();
    // fs.solve(3, {1}).print();
    // fs.solve(2, {3}).print();
    // fs.solve(4, {1, 2}).print();

    cout << "CBIP: " << endl;

    CBIPSolver cs;
    // cs.solve(1, {}).print();
    // cs.solve(3, {1}).print();
    // cs.solve(2, {3}).print();
    // cs.solve(4, {1, 2}).print();

    cs.solve(1, {}).print();
    cs.solve(6, {}).print();
    cs.solve(2, {6}).print();
    cs.solve(7, {1}).print();
    cs.solve(3, {6, 7}).print();
    cs.solve(8, {1, 2}).print();
    cs.solve(4, {6, 7, 8}).print();
    cs.solve(9, {1, 2, 3}).print();
    cs.solve(5, {6, 7, 8, 9}).print();
    cs.solve(10, {1, 2, 3, 4}).print();
}
int main()
{
    test_case();
    return 0;
}