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
    double get_competitive_ratio()
    {
        set<int> unique_colors;
        for (auto p : this->coloring)
            unique_colors.insert(p.second);
        return double(unique_colors.size()) / double(this->chromatic_number);
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
            if (p.count(vertex))
                continue;
            set<int> neighbour_colors;
            for (int v : p)
                neighbour_colors.insert(this->g.coloring[v]);
            while (neighbour_colors.count(color))
                color++;
        }
        this->g.coloring[vertex] = color;
        return this->g;
    }
};
vector<pair<int, vector<int>>> generate_random_graph(int n, int k, double p)
{
    vector<vector<int>> groups;
    set<vector<int>> edges;
    for (int i = 0; i < k; i++)
    {
        groups.push_back({});
    }
    random_device rd;
    mt19937 gen(rd());
    uniform_int_distribution<> dis(0, k - 1);
    srand(time(nullptr));
    for (int vertex = 1; vertex <= k; vertex++)
    {
        groups[vertex - 1].push_back(vertex);
    }
    for (int vertex = k + 1; vertex <= n; vertex++)
    {
        groups[dis(gen)].push_back(vertex);
    }
    for (int i = 0; i < groups.size(); i++)
    {
        for (int u : groups[i])
        {
            for (int k = 0; k < groups.size(); k++)
            {
                if (find(groups[k].begin(), groups[k].end(), u) != groups[k].end())
                    continue;
                int v = groups[k][dis(gen) % groups[k].size()];
                if (u < v)
                    edges.insert({u, v});
                else
                    edges.insert({v, u});
            }
            for (int k = 0; k < groups.size(); k++)
            {
                if (find(groups[k].begin(), groups[k].end(), u) != groups[k].end())
                    continue;
                for (int v : groups[k])
                {
                    if ((double)rand() / RAND_MAX <= p)
                    {
                        if (u < v)
                            edges.insert({u, v});
                        else
                            edges.insert({v, u});
                    }
                }
            }
        }
    }
    set<int> alreadyAdded;
    vector<pair<int, vector<int>>> step_by_step_graph;
    for (int u = 1; u <= n; u++)
    {
        vector<int> edgesToAdd;
        for (auto edge : edges)
        {
            if (edge[0] == u || edge[1] == u)
            {
                int v = edge[edge[0] == u ? 1 : 0];
                if (alreadyAdded.find(v) != alreadyAdded.end())
                    edgesToAdd.push_back(v);
            }
        }
        alreadyAdded.insert(u);
        step_by_step_graph.push_back(make_pair(u, edgesToAdd));
    }
    return step_by_step_graph;
}
void thread_cbip(int thread_id, int n, int k, double p, int num_samples, double &cr)
{
    debug("thread called - cbip", thread_id, n, k, p, num_samples);
    double avg_comp_ratio = 0.0;
    for (int sample = 1; sample <= num_samples; sample++)
    {
        // debug("cbip", thread_id, n, k, p, sample);
        auto graph = generate_random_graph(n, k, p);
        CBIPSolver cs;
        Graph g;
        for (auto p : graph)
        {
            int u = p.first;
            vector<int> edges = p.second;
            g = cs.solve(u, edges);
        }
        avg_comp_ratio += g.get_competitive_ratio();
    }
    avg_comp_ratio /= num_samples;
    cr = avg_comp_ratio;
    debug("thread finished - cbip", thread_id, n, k, p, num_samples);
}
void generate_table_cbip(int k, string prefix, vector<int> ns, vector<double> ps, int num_samples)
{
    string filename = "./csvs/" + prefix + "cbip_" + to_string(k) + ".csv";
    ofstream out_file(filename);
    out_file << "n,0.25,0.5,0.75\n";
    double avg_comp_ratio = 0;
    for (int n : ns)
    {
        out_file << to_string(n) + ",";
        for (double p : ps)
        {
            vector<double> ratios(num_samples / 10, 0.0);
            vector<thread> threads;
            for (int iter = 1; iter <= num_samples / 10; iter++)
            {
                threads.push_back(thread(thread_cbip, iter, n, k, p, num_samples / 10, ref(ratios[iter - 1])));
            }
            for (auto &t : threads)
            {
                t.join();
            }
            out_file << to_string(accumulate(all(ratios), 0.0) / 10.0) + (p != 0.75 ? "," : "");
        }
        out_file << "\n";
    }
    out_file.close();
    debug("Finished - cbip", prefix, k);
}
void thread_firstfit(int thread_id, int n, int k, double p, int num_samples, double &cr)
{
    debug("thread called - firstfit", thread_id, n, k, p, num_samples);
    double avg_comp_ratio = 0.0;
    for (int sample = 1; sample <= num_samples; sample++)
    {
        // debug("firstfit", thread_id, n, k, p, sample);
        auto graph = generate_random_graph(n, k, p);
        FirstFitSolver fs;
        Graph g;
        for (auto p : graph)
        {
            int u = p.first;
            vector<int> edges = p.second;
            g = fs.solve(u, edges);
        }
        avg_comp_ratio += g.get_competitive_ratio();
    }
    avg_comp_ratio /= num_samples;
    cr = avg_comp_ratio;
    debug("thread finished - firstfit", thread_id, n, k, p, num_samples);
}
void generate_table_firstfit(int k, string prefix, vector<int> ns, vector<double> ps, int num_samples)
{
    string filename = "./csvs/" + prefix + "firstfit_" + to_string(k) + ".csv";
    ofstream out_file(filename);
    out_file << "n,0.25,0.5,0.75\n";
    double avg_comp_ratio = 0;
    for (int n : ns)
    {
        out_file << to_string(n) + ",";
        for (double p : ps)
        {
            vector<double> ratios(num_samples / 10, 0.0);
            vector<thread> threads;
            for (int iter = 1; iter <= num_samples / 10; iter++)
            {
                threads.push_back(thread(thread_firstfit, iter, n, k, p, num_samples / 10, ref(ratios[iter - 1])));
            }
            for (auto &t : threads)
            {
                t.join();
            }
            out_file << to_string(accumulate(all(ratios), 0.0) / 10.0) + (p != 0.75 ? "," : "");
        }
        out_file << "\n";
    }
    out_file.close();
    debug("Finished - firstfit", prefix, k);
}
void test_case()
{
    vector<int> ns = {50, 100, 200, 400, 800, 1600, 3200};
    vector<double> ps = {0.25, 0.5, 0.75};
    /*
        Tables
    */
    string table = "table_",
           graph = "graph_";
    vector<thread> all_threads;
    int _2 = 2;
    for (int k : {2, 3, 4})
    {
        all_threads.push_back(thread(generate_table_firstfit, k, table, ns, ps, 100));
    }
    all_threads.push_back(thread(generate_table_cbip, _2, table, ns, ps, 100));
    /*
        Growth Rate
    */
    // for (int k : {2, 3, 4})
    // {
    //     all_threads.push_back(thread(generate_table_firstfit, k, graph, finer_ns, ps, 100));
    // }
    // all_threads.push_back(thread(generate_table_cbip, _2, graph, finer_ns, ps, 100));

    for (auto &t : all_threads)
        t.join();
}
int main()
{
    test_case();
    return 0;
}
